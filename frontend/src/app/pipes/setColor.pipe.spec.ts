import { setColorPipe } from './setColor.pipe';

describe('setColorPipe', () => {
  const pipe = new setColorPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('choose color black', () => {
    expect(pipe.transform(false)).toBe('black');
  });

  it('choose color light red', () => {
    expect(pipe.transform(true)).toBe('#F67280');
  });
});
