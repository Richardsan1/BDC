pipeline {
    agent any

    tools {
        // O nome que você definiu na ferramenta do Jenkins
        nodejs "node25" 
    }

    stages {
        stage('Checkout') {
            steps {
                // Clona o código do GitHub
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                // Instala dependências
                script {
                    if (isUnix()) {
                        sh 'npm install'
                    } else {
                        bat 'npm install'
                    }
                }
            }
        }
        stage('Test') {
            steps {
                // Executa os testes e gera relatório JUnit para o Jenkins
                script {
                    if (isUnix()) {
                        sh 'npm run test:ci'
                    } else {
                        bat 'npm run test:ci'
                    }
                }
            }
        }
    }
    
    post {
        always {
            // Publica os resultados dos testes no Jenkins
            junit allowEmptyResults: true, testResults: 'junit.xml'
            echo 'Testes Finalizados.'
        }
    }
}
