//! Library for playing with VM memory
library buf;

use ::std::intrinsics::*;
use ::std::alloc::*;
use ::std::mem::*;
use ::std::revert::*;
use ::std::assert::*;

/// A block of data on the heap
pub struct Buffer {
    ptr: u64,
    len: u64,
}

impl Buffer {
    pub fn new() -> Self {
        Buffer {
            ptr: alloc(0),
            len: 0,
        }
    }

    pub fn from_ptr(ptr: u64, len: u64) -> Self {
        Buffer {
            ptr: ptr,
            len: len,
        }
    }

    /// Pointer to the buffer's data in memory
    pub fn ptr(self) -> u64 {
        self.ptr
    }

    /// Size of the buffer
    pub fn len(self) -> u64 {
        self.len
    }

    pub fn is_empty(self) -> bool {
        self.len == 0
    }

    /// Copies and appends `buf` to the `Buffer`.
    pub fn extend_from_buf(ref mut self, buf: Self) -> u64 {
        if (buf.len == 0) {
            return self.len;
        }

        let old_len = self.len;

        // Resize
        let new_size = self.len + buf.len;
        self.ptr = realloc(self.ptr, self.len, new_size);
        self.len = new_size;

        copy(buf.ptr, self.ptr + old_len, buf.len);

        old_len
    }

    pub fn extend_from_ptr(ref mut self, ptr: u64, len: u64) -> u64 {
        if (len == 0) {
            return self.len;
        }

        let old_len = self.len;

        // Resize
        let new_size = self.len + len;
        self.ptr = realloc(self.ptr, self.len, new_size);
        self.len = new_size;

        copy(ptr, self.ptr + old_len, len);

        old_len
    }
}

impl core::ops::Eq for Buffer {
    fn eq(self, other: Self) -> bool {
        if self.len != other.len {
            false
        } else if self.ptr == other.ptr {
            true
        } else {
            eq(self.ptr, other.ptr, self.len)
        }
    }
}
