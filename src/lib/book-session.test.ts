import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { hrefForReopen, isCoverEntryPath, isIntroPath, PAGE_ONE_HREF } from './book-session.ts';

describe('book session reopen', () => {
  it('treats intro as page 1', () => {
    assert.equal(isIntroPath('/intro'), true);
    assert.equal(isIntroPath('/article/12'), false);
    assert.equal(isCoverEntryPath('/'), true);
    assert.equal(isCoverEntryPath('/intro'), true);
    assert.equal(isCoverEntryPath('/code'), false);
  });

  it('starts at page 1 when the closed book is reopened from the cover', () => {
    assert.equal(hrefForReopen('cover', { lastReadId: 45 }), PAGE_ONE_HREF);
    assert.equal(hrefForReopen('cover'), PAGE_ONE_HREF);
  });

  it('keeps Continue and Today’s Rule as explicit jumps for return visits', () => {
    assert.equal(hrefForReopen('continue', { lastReadId: 45 }), '/article/45');
    assert.equal(hrefForReopen('continue', { lastReadId: null }), PAGE_ONE_HREF);
    assert.equal(hrefForReopen('todays-rule', { todaysId: 7 }), '/article/7');
  });
});
