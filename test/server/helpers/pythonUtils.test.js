import mocha from 'mocha';
import chai from 'chai';
import * as pythonUtils from '../../../src/server/helpers/pythonUtils';

const assert = chai.assert;

describe('PythonUtils', () => {
  describe('#moveIsInProgress', () => {

    it('should return false when movement is not present', () => {
      assert.isFalse(pythonUtils.moveIsInProgress('newMove'));
    })

    it('should return true when movement is present', () => {
      assert.isTrue(pythonUtils.moveIsInProgress('newMove'));
    })
  })
})