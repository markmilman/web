const WorkerController = require('../worker-controller')

let workerController = new WorkerController();
describe('WorkerController', () =>{
    it('should be created succefully', () => {
        expect(workerController).toBeDefined();
    })
})