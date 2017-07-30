import { PersonLabelPipe } from './person-label.pipe';

describe('PersonLabelPipe', () => {
  it('create an instance', () => {
    const pipe = new PersonLabelPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms undercases in spaces', () => {
    const pipe = new PersonLabelPipe();
    const input = 'A_a_';
    const output = pipe.transform(input);

    expect(output).toBe('A a ');
  });

  it('capitalizes', () => {
    const pipe = new PersonLabelPipe();
    const input = 'kendrick';
    const output = pipe.transform(input);

    expect(output).toBe('Kendrick');
  });

});
