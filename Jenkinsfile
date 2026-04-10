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
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                // Executa os testes
                sh 'npm test'
            }
        }
    }
    
    post {
        always {
            // Opcional: Publicar relatórios de teste
            echo 'Testes Finalizados.'
        }
    }
}
