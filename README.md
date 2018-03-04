# Vue, Apollo, GraphCool App

> A preconfigured vue, apollo, and graphcool application.

## Setup Vue

``` bash
# install vue-cli
npm install --global vue-cli

# create a new project using the "webpack" template
vue init webpack my-project

# install dependencies
cd my-project
npm install
npm run dev
```
## Setup Apollo & GraphQL

``` bash
npm install apollo-boost apollo-server-express apollo-link-context vue-apollo graphql graphql-tools cors
```
## Setup Back-End with GraphCool
### Installation
``` bash
npm install -g graphcool
```

###Create Server & Link it to Your Application
``` bash
graphcool init
```

Now set the HTTP end point in the apollo-client.js file to the graphcool Simple API link generated by your 'graphcoool init' setup. You can also look these endpoints up again later with the command:
``` bash
graphcool endpoints
```

###Create Your Initial Schema
Create your initial schema in the project.graphcool file and then push the changes to the graphcool server.
``` bash
 graphcool push
```

###Setup User Account Authorization
Open your GraphCool console
``` bash
 graphcool console
```

Click on the Integrations link in the menu and then enable the Email-Password Auth integration.

Do a pull request to your GraphCool server to bring down the schema changes that occurred from adding the Email-Password Auth integration.
``` bash
 graphcool pull
```

###Other GraphCool Commands

Usage: graphcool [command]

  Commands:
    quickstart    Tutorial to get started with Graphcool
    init          Create a new project
    push          Push project file changes
    pull          Download the latest project file
    export        Export project data
    endpoints     Print GraphQL endpoints
    console       Open Graphcool Console
    playground    Open GraphQL Playground
    projects      List projects
    auth          Sign up or login
    version       Print version