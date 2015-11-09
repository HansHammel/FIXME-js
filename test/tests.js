/* global describe, beforeEach, it */
/* eslint padded-blocks: 0, new-cap: 0, W030: 0 */

'use strict';

var chai, sinon, FIXME, fixmeError, parseDate, parseSingleString;

chai = require('chai');
sinon = require('sinon');
chai.use(require('sinon-chai'));
chai.should();

FIXME = require('../index');
fixmeError = require('../fixme-error');
parseDate = require('../parse-date')(fixmeError);
parseSingleString = require('../parse-single-string')(fixmeError, parseDate);

// Wrapper function for try..catch, calls `tryFn` and if it throws, calls `catchFn`.
function tryCatch(tryFn, catchFn, errorType) {
  var errType = errorType || fixmeError.unfixedErrorName;
  try {
    tryFn();
  } catch (e) {
    if (e.name !== errType) {
      console.log(e);
    }
    catchFn(e);
  }
}

describe('FIXME', () => {
  var pastLabel, pastStrDate, pastDate, pastText, pastOpts;
  var futureLabel, futureStrDate, futureDate, futureText;
  var spyFn;

  beforeEach(done => {
    process.env.NODE_ENV = 'test';
    pastLabel = '12/31/1999: Close doors of cryogenic pods.';
    pastStrDate = '12/31/1999';
    pastDate = new Date('12/31/1999');
    pastText = 'Close doors of cryogenic pods.';
    pastOpts = parseSingleString(pastLabel);
    // Hopefully there will be a better way to do this by then.
    futureLabel = '1/1/3000: Check for new people in the lab.';
    futureStrDate = '1/1/3000';
    futureDate = new Date('1/1/3000');
    futureText = 'Check for new people in the lab.';
    spyFn = sinon.spy();
    done();
  });

  describe('call with a single string argument', () => {
    it('and a label using past date should throw', done => {
      tryCatch(() => FIXME(pastLabel), spyFn);
      // Expect catch spy to be called with error message like the one generated for error.
      spyFn.should.have.been.calledWith(fixmeError.unfixedError(pastOpts.date, pastOpts.text));
      done();
    });
    it('and a label using future date should not throw', done => {
      tryCatch(() => FIXME(futureLabel), spyFn);
      // No error should be thrown, therefore catch spy should never be called.
      spyFn.should.not.have.been.called;
      done();
    });

    describe('while also using (empty) opts object', () => {
      it('and a label using past date should throw', done => {
        tryCatch(() => FIXME(pastLabel, {}), spyFn);
        // Expect catch spy to be called with error message like the one generated for error.
        spyFn.should.have.been.calledWith(fixmeError.unfixedError(pastOpts.date, pastOpts.text));
        done();
      });
      it('and a label using future date should not throw', done => {
        tryCatch(() => FIXME(futureLabel, {}), spyFn);
        // No error should be thrown, therefore catch spy should never be called.
        spyFn.should.not.have.been.called;
        done();
      });
    });

    describe('while using wrong arguments', () => {
      it('should throw an ArgumentError when label date format is invalid', done => {
        var strDate = 'abc123';
        tryCatch(() => FIXME(strDate + ': test'), spyFn, fixmeError.argumentErrorName);
        spyFn.should.have.been.calledWith(fixmeError.factory(fixmeError.argumentErrorName, 'Date "' + strDate + '" is not valid.'));
        done();
      });

      it('should throw an ArgumentError when label is a "random" string', done => {
        tryCatch(() => FIXME('Bad news, everyone!'), spyFn, fixmeError.argumentErrorName);
        spyFn.should.have.been.calledWith(fixmeError.factory(fixmeError.argumentErrorName, 'Given string is not in format "[date]:[label]".'));
        done();
      });
    });
  }); // call with a single string argument

  describe('call with two string argumets', () => {
    it('and a label using past date should throw', done => {
      tryCatch(() => FIXME(pastStrDate, pastText), spyFn);
      // Expect catch spy to be called with error message like the one generated for error.
      spyFn.should.have.been.calledWith(fixmeError.unfixedError(pastOpts.date, pastOpts.text));
      done();
    });
    it('and a label using future date should not throw', done => {
      tryCatch(() => FIXME(futureStrDate, futureText), spyFn);
      // No error should be thrown, therefore catch spy should never be called.
      spyFn.should.not.have.been.called;
      done();
    });

    describe('while also using (empty) opts object', () => {
      it('and a label using past date should throw', done => {
        tryCatch(() => FIXME(pastStrDate, pastText, {}), spyFn);
        // Expect catch spy to be called with error message like the one generated for error.
        spyFn.should.have.been.calledWith(fixmeError.unfixedError(pastOpts.date, pastOpts.text));
        done();
      });
      it('and a label using future date should not throw', done => {
        tryCatch(() => FIXME(futureStrDate, futureText, {}), spyFn);
        // No error should be thrown, therefore catch spy should never be called.
        spyFn.should.not.have.been.called;
        done();
      });
    }); // while also using (empty) opts object

    describe('while using wrong arguments', () => {
      it('should throw an ArgumentError when string date format is invalid', done => {
        var strDate = 'abc123';
        tryCatch(() => FIXME(strDate, 'test'), spyFn, fixmeError.argumentErrorName);
        spyFn.should.have.been.calledWith(fixmeError.factory(fixmeError.argumentErrorName, 'Date "' + strDate + '" is not valid.'));
        done();
      });
    }); // while using wrong arguments
  }); // call with two string argumets

  describe('call with date and string argumets', () => {
    it('and a label using past date should throw', done => {
      tryCatch(() => FIXME(pastDate, pastText), spyFn);
      // Expect catch spy to be called with error message like the one generated for error.
      spyFn.should.have.been.calledWith(fixmeError.unfixedError(pastOpts.date, pastOpts.text));
      done();
    });
    it('and a label using future date should not throw', done => {
      tryCatch(() => FIXME(futureDate, futureText), spyFn);
      // No error should be thrown, therefore catch spy should never be called.
      spyFn.should.not.have.been.called;
      done();
    });

    describe('while also using (empty) opts object', () => {
      it('and a label using past date should throw', done => {
        tryCatch(() => FIXME(pastDate, pastText, {}), spyFn);
        // Expect catch spy to be called with error message like the one generated for error.
        spyFn.should.have.been.calledWith(fixmeError.unfixedError(pastOpts.date, pastOpts.text));
        done();
      });
      it('and a label using future date should not throw', done => {
        tryCatch(() => FIXME(futureDate, futureText, {}), spyFn);
        // No error should be thrown, therefore catch spy should never be called.
        spyFn.should.not.have.been.called;
        done();
      });
    }); // while also using (empty) opts object
  }); // call with date and string argumets

  describe('call using none of the specified call signatures', () => {
    it('should throw ArgumentError if called without arguments', done => {
      tryCatch(() => FIXME(), spyFn, fixmeError.argumentErrorName);
      spyFn.should.have.been.calledWith(fixmeError.factory(fixmeError.argumentErrorName, 'Incorrect FIXME call signature.'));
      done();
    });

    it('should throw ArgumentError if called with 3 string arguments', done => {
      tryCatch(() => FIXME(pastStrDate, pastText, 'some string'), spyFn, fixmeError.argumentErrorName);
      spyFn.should.have.been.calledWith(fixmeError.factory(fixmeError.argumentErrorName, 'Incorrect FIXME call signature.'));
      done();
    });

    it('should throw ArgumentError if called with date and 2 string arguments', done => {
      tryCatch(() => FIXME(pastDate, pastText, 'some string'), spyFn, fixmeError.argumentErrorName);
      spyFn.should.have.been.calledWith(fixmeError.factory(fixmeError.argumentErrorName, 'Incorrect FIXME call signature.'));
      done();
    });

    it('should throw ArgumentError if called with an object argument', done => {
      tryCatch(() => FIXME({}), spyFn, fixmeError.argumentErrorName);
      spyFn.should.have.been.calledWith(fixmeError.factory(fixmeError.argumentErrorName, 'Incorrect FIXME call signature.'));
      done();
    });

    it('should throw ArgumentError if called with a date argument', done => {
      tryCatch(() => FIXME(pastDate), spyFn, fixmeError.argumentErrorName);
      spyFn.should.have.been.calledWith(fixmeError.factory(fixmeError.argumentErrorName, 'Incorrect FIXME call signature.'));
      done();
    });
  }); // call using none of the specified call signatures

  describe('call based on environment', () => {

    describe('"development"', () => {
      beforeEach(done => {
        process.env.NODE_ENV = 'development';
        done();
      });

      it('should always throw since not in production', done => {
        tryCatch(() => FIXME(pastLabel), spyFn);
        // Expect catch spy to be called with error message like the one generated for error.
        spyFn.should.have.been.calledWith(fixmeError.unfixedError(pastOpts.date, pastOpts.text));
        done();
      });
    }); // development

    describe('"test"', () => {
      it('should always throw since not in production', done => {
        tryCatch(() => FIXME(pastLabel), spyFn);
        // Expect catch spy to be called with error message like the one generated for error.
        spyFn.should.have.been.calledWith(fixmeError.unfixedError(pastOpts.date, pastOpts.text));
        done();
      });
    }); // development

    describe('"production"', () => {
      beforeEach(done => {
        process.env.NODE_ENV = 'production';
        done();
      });

      it('should throw if in production and skipProd option is set to false', done => {
        process.env.NODE_ENV = 'production';
        tryCatch(() => FIXME(pastLabel, {
          skipProd: false
        }), spyFn);
        // Expect catch spy to be called with error message like the one generated for error.
        spyFn.should.have.been.calledWith(fixmeError.unfixedError(pastOpts.date, pastOpts.text));
        done();
      });

      it('should not throw if in production and skipProd is set to true (default)', done => {
        // Call once with default options and once with explicitly set skipProd to true.
        tryCatch(() => FIXME(pastLabel), spyFn);
        tryCatch(() => FIXME(pastLabel, {
          skipProd: true
        }), spyFn);
        // No error should be thrown, therefore catch spy should never be called.
        spyFn.should.not.have.been.called;
        done();
      });
    }); // production
  }); // call based on environment

}); // FIXME
