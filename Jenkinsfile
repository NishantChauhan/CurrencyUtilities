pipeline {
    agent {
        docker {
            image 'node:10-alpine'
            args '--user root -p 4000:4000 -p 4001:4001 -p 4002:4002 -v /var/run/docker.sock:/var/run/docker.sock -v /usr/local/bin:/usr/local/bin'
        }
    }
    stages {
        stage('Deliver') {
            environment {
                DOCKER_HUB_CREDS = credentials('docker-hub-credential')
            }
            steps {
                sh 'chmod +x ./jenkins/scripts/*.sh'
                sh './jenkins/scripts/deliver.sh'
            }
        }

    }
}
