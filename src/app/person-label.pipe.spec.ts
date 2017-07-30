import { PersonLabelPipe } from './person-label.pipe';

describe('PersonLabelPipe', () => {
  it('create an instance', () => {
    const pipe = new PersonLabelPipe();
    expect(pipe).toBeTruthy();
  });
});
