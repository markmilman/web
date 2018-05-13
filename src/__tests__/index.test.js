jest.mock('clocker-core');
const Clocker = require('clocker-core');
const {mockGetWorkerInteractor} = require('clocker-core');
const request = require('supertest');
const workerController = require('src/controllers/worker-controller');
const router = require('index');

jest.mock('src/controllers/worker-controller');


describe('Web Router (index.js)', () =>{
  test('temp', () => {
//     

    let c = new Clocker();
    c.getWorkerInteractor();
    expect(c.getWorkerInteractor).toHaveBeenCalled();
    console.log('Clocker.mock.instances[0].getWorkerInteractor: ', Clocker.mock.instances[0].getWorkerInteractor)
    console.log('**** mockGetWorkerInteractor: ',mockGetWorkerInteractor)
    expect(Clocker).toHaveBeenCalledTimes(1);
    expect(mockGetWorkerInteractor).toHaveBeenCalledTimes(1);
  })
  
  
  test('router should be created succesfuly', () =>{
      expect(router).toBeTruthy();
  })

  describe('GET /api/workers',  () => {
    it('should send a command message to workerController',  () => {
       request(router).get('/api/workers')
         .then( () => {
           let controller = workerController.mock.instances[0];
           const findAll = controller.findAll;
           expect(findAll).toHaveBeenCalledTimes(1);
       });
    })
  })
  
  describe('POST /api/worker', () => {
    let validWorker = {
      name: 'Valid Worker1'
    }
    
    it('should return 200',  () =>{
        let res =  request(router).post('/api/workers', validWorker);
        expect(res.statusCode).toBe(200);
    })
    
    it('should return a valid worker with id', async () => {
        let res = await request(router).post('/api/workers', validWorker);
        expect(res.body).toBe(validWorker);
    })
  });
});


// var app = require('./server').app;

// describe('Server', () => {

//   describe('GET /', () => {
//     it('should return hello world response', (done) => {
//       request(app)
//         .get('/')
//         .expect(404)
//         .expect((res) => {
//           expect(res.body).toInclude({
//             error: 'Page not found.'
//           });
//         })
//         .end(done);
//     });
//   });

//   describe('GET /users', () => {
//     it('should return my user object', (done) => {
//       request(app)
//         .get('/users')
//         .expect(200)
//         .expect((res) => {
//           expect(res.body).toInclude({
//             name: 'Andrew',
//             age: 25
//           });
//         })
//         .end(done);
//     });
//   });
// });
