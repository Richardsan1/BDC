pipeline {
  agent { label 'aws' }

  options {
    disableConcurrentBuilds()
    timestamps()
  }

  environment {
    NODE_ENV = 'test'
  }

  stages {
    stage('Instalar dependências') {
      steps {
        sh '''
          set -e
          npm --prefix api/apiGateway ci
          npm --prefix api/authService ci
          npm --prefix api/userService ci
          npm --prefix api/searchService ci
          npm --prefix api/bookingService ci
          npm --prefix api/paymentService ci
          npm --prefix api/adminService ci
          npm --prefix api/notificationService ci
          npm --prefix app ci
          npm --prefix teste ci
        '''
      }
    }

    stage('Fila de testes') {
      stages {
        stage('apiGateway') {
          steps { sh 'npm --prefix teste run test:apiGateway' }
        }
        stage('authService') {
          steps { sh 'npm --prefix teste run test:authService' }
        }
        stage('userService') {
          steps { sh 'npm --prefix teste run test:userService' }
        }
        stage('searchService') {
          steps { sh 'npm --prefix teste run test:searchService' }
        }
        stage('bookingService') {
          steps { sh 'npm --prefix teste run test:bookingService' }
        }
        stage('paymentService') {
          steps { sh 'npm --prefix teste run test:paymentService' }
        }
        stage('adminService') {
          steps { sh 'npm --prefix teste run test:adminService' }
        }
        stage('notificationService') {
          steps { sh 'npm --prefix teste run test:notificationService' }
        }
        stage('frontend') {
          steps { sh 'npm --prefix teste run test:frontend' }
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'teste/**/*.xml', allowEmptyArchive: true
    }
  }
}
