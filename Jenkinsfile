pipeline {
    agent any
    environment {
        DOCKER_HOST = 'tcp://docker:2376' // Replace with your Docker host, if required
        DOCKER_IMAGE = 'dimas182/angular_front:tesbuild'
        PATH = "$PATH:/usr/libexec/docker/cli-plugins/docker-compose"
    }
    tools {
        nodejs "node14.16.1" // Replace with your Node.js version name from Jenkins
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                withCredentials([string(credentialsId: 'NPM_AUTH_TOKEN', variable: 'NPM_AUTH_TOKEN')]) {
                    sh '''
                        npm config set //registry.npmjs.org/:_authToken=${NPM_AUTH_TOKEN}
                        npm install
                    '''
                }
            }
        }
        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Docker Build') {
          steps {
            withCredentials([string(credentialsId: 'NPM_AUTH_TOKEN', variable: 'NPM_AUTH_TOKEN')]) {
                sh '''
                    docker build --build-arg NPM_AUTH_TOKEN=${NPM_AUTH_TOKEN} -t dimas182/angular_front:tesbuild .
                  '''
            }
          }
        }
        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh '''
                        echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                        docker push dimas182/angular_front:tesbuild
                    '''
                }
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                    /usr/libexec/docker/cli-plugins/docker-composee down || true
                    /usr/libexec/docker/cli-plugins/docker-compose up -d
                '''
            }
        }
    }
}
