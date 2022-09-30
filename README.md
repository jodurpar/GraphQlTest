# DSsqlgrahqlapi.Test

This project is a test.
Contains experimental features for use in other production apis.
Made with:
 - Typescript
 - Mercurius
 - mssql
 - fastify

When debuging run (f5 in visual studio) runs at 
    - Localhost:51240/graphiql
in docker runs at
    - host.docker.internal:51240/graphiql

You can pull this image at https://hub.docker.com/repository/docker/jodurpar/dssqlgraphqlapi

You may change this port to your desired port, changin dockerfile
    
## Install

### In command prompt

- Clone this project
- Run npm install
- Compile Typescript
- Run node app.js

You mus change the setting adding arguments at command propmt

   node app.js [args]

- --apiport':
- --p:             
- --description':
- --d: 
- --name':
- --n:
- --sqlserver':
- --s:
- --database':
- --g:
- --user:
- --u: 
- --password':
- --w:
- lt: break;
            
```javascript
    node app -p 51240 --s . -g test
```

This runs the api at 51240 port against Sqlserver at localhost and database test.
Inside the playground you can reconect to another server or database

### In visual studio 2019/2022

- Clone this project
- To run and debug in visual studio environments, remove "outDir" line of "compilerOptions" element in tsconfig.json file.
- Type F5 or start debugging


### Webpack

- Add "outDir" to tsconfig.json at "compilerOptions" element.   
   ```javascript
    "outDir": "./dist",
   ```
- Run webpack in the dist folder command prompt. This make a /dist folder with Dssqlgraphqlpi.js file.
- At command prompt: webpack --config=webpack.config.js

### Docker container.

- There are a docker file in the root folder. Run docker build to make a docker image. 
- Build docker image: docker build -t dssqlgraphqlapi:latest .
- Create container either portainer, kitematic or another docker tool
- Run container

## Uninstall

- Remove solution.
- Remode docker container and images.


#examples

In Query bodys you can include all data needes, this is onle one example.
The complete list of data can yo see in docs section in the playground (upper-right corner)


query Databases {
  AllDatabases {
    name
  }
}

query StoredProcedures {
	AllStoredProcedures {
    schema_name
    name
    id
    crdate
  }
}

query GetOneSp {
  OneStoredProcedure(name: "GetCityUpdates") {
    Text
  }
}

query Views {
	AllViews {
    schema_name
    name
    id
    crdate
  }
}

query GetOneView {
  OneView(name: "Customers") {
    Text
  }
}


query AllTables {
  AllTables {
    TABLE_NAME
  }
}

query OneTable {
  OneTable( name: "Cities") {
    TABLE_NAME
    COLUMN_NAME
    COLUMN_DEFAULT
    IS_NULLABLE
    DATA_TYPE
    CHARACTER_MAXIMUM_LENGTH
  }
}

query TableIndex {
  TableIndex(name : "Application.Cities") {
    index_name
    index_description
    index_keys
  }
}

query AllFunctions {
  AllFunctions {
     extended_name
    Dependencies
  }
}

query OneFunction {
  OneFunction(name: "CalculateCustomerPrice") {
    Text
  }
}

query TableAcesses {
  TableAccesses(name: "Cities", type: "!updte") {
    name
    type_desc
    create_date
  }
}

query UseThisFunction {
  UseThisFunction(name: "CalculateCustomerPrice") {
    name
    type_desc
    create_date
  }
}

query DatabaseReconnect {
  DatabaseReconnect(server: "host.docker.internal") {
     Text
  }
}

query DatabaseReconnect {
  DatabaseReconnect(database: "test") {
     Text
  }
}
query DatabaseReconnect {
  DatabaseReconnect(server: "host.docker.internal", database: "test") {
     Text
  }
}

