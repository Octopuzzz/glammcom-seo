pipeline {
  agent any

  environment {
    IMAGE_NAME = "asterney/irene-art-gallery"
    DOCKER_CREDS = credentials('docker-hub-credentials')
    
    // Deployment configuration
    PORT_DEV        = "3004"
    CONTAINER_DEV   = "irene-art-gallery-dev"
    
    PORT_STAGING    = "3005"
    CONTAINER_STAGE = "irene-art-gallery-staging"

    PORT_PROD       = "3006"
    CONTAINER_PROD  = "irene-art-gallery-production"
  }

  stages {
    // =========================================================
    // STAGE 1: Build Docker Image (with Branch-Aware API URL)
    // =========================================================
    stage('Build Image') {
      steps {
        script {
          def apiUrls = [
            'develop' : 'https://crud-builder.aster-tech-indo.me',
            'staging' : 'https://crud-builder.aster-tech-indo.me',
            'main'    : 'https://crud-builder.aster-tech-indo.me'
          ]

          def branch = env.BRANCH_NAME ?: env.GIT_BRANCH?.tokenize('/')?.last() ?: 'develop'
          def apiUrl = apiUrls[branch] ?: 'http://localhost:8080'

          // withCredentials safely masks secrets — no interpolation into Groovy strings
          withCredentials([usernamePassword(
            credentialsId: 'docker-hub-credentials',
            usernameVariable: 'DOCKER_USER',
            passwordVariable: 'DOCKER_PASS'
          )]) {
            sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
            sh "docker build --build-arg NEXT_PUBLIC_API_URL=${apiUrl} -t ${IMAGE_NAME}:latest -t ${IMAGE_NAME}:${env.BUILD_NUMBER} ."
            sh "docker push ${IMAGE_NAME}:latest"
            sh "docker push ${IMAGE_NAME}:${env.BUILD_NUMBER}"
            sh 'docker logout'
          }
        }
      }
    }

    // =========================================================
    // STAGE 3: Deploy to DEV (branch: dev / develop)
    // =========================================================
    stage('Deploy Dev') {
      when {
        expression {
          return env.BRANCH_NAME == 'dev' || env.BRANCH_NAME == 'develop' || env.GIT_BRANCH?.endsWith('dev') || env.GIT_BRANCH?.endsWith('develop')
        }
      }
      steps {
        sh """
          docker stop ${CONTAINER_DEV} || true
          docker rm ${CONTAINER_DEV} || true
          docker pull ${IMAGE_NAME}:latest
          docker run -d \\
            --name ${CONTAINER_DEV} \\
            --restart unless-stopped \\
            -p ${PORT_DEV}:3000 \\
            ${IMAGE_NAME}:latest
        """
        sleep 5
        sh "docker ps | grep ${CONTAINER_DEV}"
      }
    }

    // =========================================================
    // STAGE 4: Deploy to STAGING (branch: staging)
    // =========================================================
    stage('Deploy Staging') {
      when {
        expression {
          return env.BRANCH_NAME == 'staging' || env.GIT_BRANCH?.endsWith('staging')
        }
      }
      steps {
        sh """
          docker stop ${CONTAINER_STAGE} || true
          docker rm ${CONTAINER_STAGE} || true
          docker pull ${IMAGE_NAME}:latest
          docker run -d \\
            --name ${CONTAINER_STAGE} \\
            --restart unless-stopped \\
            -p ${PORT_STAGING}:3000 \\
            ${IMAGE_NAME}:latest
        """
        sleep 5
        sh "docker ps | grep ${CONTAINER_STAGE}"
      }
    }

    // =========================================================
    // STAGE 5: Manual Approval for Production (branch: main / master)
    // =========================================================
    stage('Approval for Production') {
      when {
        expression {
          return env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'master' || env.GIT_BRANCH?.endsWith('main') || env.GIT_BRANCH?.endsWith('master')
        }
      }
      steps {
        timeout(time: 30, unit: 'MINUTES') {
          input message: "Deploy irene-art-gallery build #${env.BUILD_NUMBER} to PRODUCTION?",
                ok: 'Deploy Now',
                submitter: 'tech-lead,devops'
        }
      }
    }

    // =========================================================
    // STAGE 6: Deploy to PRODUCTION (branch: main / master)
    // =========================================================
    stage('Deploy Production') {
      when {
        expression {
          return env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'master' || env.GIT_BRANCH?.endsWith('main') || env.GIT_BRANCH?.endsWith('master')
        }
      }
      steps {
        sh """
          docker stop ${CONTAINER_PROD} || true
          docker rm ${CONTAINER_PROD} || true
          docker pull ${IMAGE_NAME}:latest
          docker run -d \\
            --name ${CONTAINER_PROD} \\
            --restart unless-stopped \\
            -p ${PORT_PROD}:3000 \\
            ${IMAGE_NAME}:latest
        """
        sleep 5
        sh "docker ps | grep ${CONTAINER_PROD}"
      }
    }
  }

  post {
    success {
      echo "✅ Deploy irene-art-gallery successful — Build #${env.BUILD_NUMBER}"
    }
    failure {
      echo "❌ Deploy irene-art-gallery FAILED — Build #${env.BUILD_NUMBER}. Check logs."
      sh "docker rmi ${IMAGE_NAME}:latest ${IMAGE_NAME}:${env.BUILD_NUMBER} || true"
      sh "docker image prune -f"
    }
    always {
      sh "docker logout || true"
    }
  }
}
