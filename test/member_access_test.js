import check from './support/check.js';

describe('member access', () => {
  it('allows dot-on-the-next-line style member access', () => {
    check(`
      a
        .b
    `, `
      a
        .b;
    `);
  });

  it('allows dot-on-this-line-member-on-next-line style member access', () => {
    check(`
      a. # hello!
        b
    `, `
      a. // hello!
        b;
    `);
  });

  it('allows dot-on-the-next-line style member access as a callee', () => {
    check(`
      a
        .b()
    `, `
      a
        .b();
    `);
  });

  it('allows dot-on-the-next-line style member access as a callee with arguments', () => {
    check(`
      a
        .b(1, 2)
    `, `
      a
        .b(1, 2);
    `);
  });

  it('allows chained dot-on-the-next-line style member access as a callee', () => {
    check(`
      a
        .b()
        .c()
    `, `
      a
        .b()
        .c();
    `);
  });

  it('allows assignment to member expressions of functions', () => {
    check(`
      a.b = ->
    `, `
      a.b = function() {};
    `);
  });

  it('wraps parens around number literals on the left side of a member access', () => {
    check(`
      1.toString()
    `, `
      (1).toString();
    `);
  });

  it('does not wrap parens around number literals containing a dot', () => {
    check(`
      1.5.toString()
    `, `
      1.5.toString();
    `);
  });

  it('transforms calling the result of a dynamic member access properly', () => {
    check(`
      a[b]()
    `, `
      a[b]();
    `);
  });

  it('forces expressions in dynamic member access', () => {
    check(`
      a[if b then c else d]
    `, `
      a[b ? c : d];
    `);
  });
});
