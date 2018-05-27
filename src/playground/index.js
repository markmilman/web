const { Container } = require('js-data');
const { SqlAdapter } = require( 'js-data-sql'); 

let adapter = new SqlAdapter({
    knexOpts: {
      client: 'mysql',
          // Setup connection details
      connection: {
        host: '127.0.0.1',
        port: 3306,
        database: 'web',
        user: 'root',
        password: 'YOUR PASSWORD'
      },
      // Configure connection pool
      pool: {
        min: 0,
        max: 10
      }
    },
  });

let store =  new Container();

store.registerAdapter('sql', adapter, {default: true});

store.defineMapper('worker', {
  debug: true,
  schema: {
    properties: {
      id: {
        type: 'number'
      },
      name: {
        type: 'string',
        required: true
      }, 
      organization_id: {
        type: 'number'
      }
    }
  },
  relations: {
    belongsTo: {
      organization: {
        localField: 'organization',
        foreignKey: 'organization_id'
      }
    }
  }
})

store.defineMapper('organization', {
  debug: true,
  schema:   {
    properties: {
      id: {
        type: 'number'
      },
      name: {
        type: 'string'
      }
    }
  },
  relations: {
    hasMany: {
      worker: {
        localField: 'workers',
        foreignKey: 'organization_id'
      }
    }
  }
})

let org = {
  name: 'org2',
}
let orgWithWorkers = {
  name: 'orgwithWorkersName',
  workers: [
    {name: null}
  ]
}

let worker = {
  name: 'worker1'
}

// get Mappers
let orgService = store.getMapper('organization');
let workerService = store.getMapper('worker');

let orgRecord = orgService.createRecord(orgWithWorkers, {noValidate: true});
// orgRecord.log('info', 'Log from JSDATA') 

if (orgRecord.isValid() && orgRecord.workers[0].isValid()) {
  orgRecord.save({with: ['workers']}).then((o) =>{
    console.log('The workers', o.workers)
  }).catch((e) =>{
    console.log('### ERROR: ', e)
  })
  
} else {
  let orgErrors = orgRecord.validate() 
  let workerErrors = orgRecord.workers[0].validate()
  
  console.log('Org Record Invalid', JSON.stringify(orgErrors))
  console.log('Worker Record Invalid', JSON.stringify(workerErrors))
}

console.log('END')
