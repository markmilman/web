const mockGetWorkerInteractor = jest.fn();
const mock = jest.fn().mockImplementation(() => {
  let res = {
    getWorkerInteractor: mockGetWorkerInteractor
  } 
  
  res.getWorkerInteractor.mockImplementation( () => res)
  return res
});

module.exports = mock;
module.exports.mockGetWorkerInteractor = mockGetWorkerInteractor;

