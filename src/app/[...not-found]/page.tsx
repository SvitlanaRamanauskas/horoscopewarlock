'use client';

import React, { Suspense } from 'react';

const NotFoundInner = () => {
  return <div>not found</div>;
};

const NotFound = () => {
  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <NotFoundInner />
    </Suspense>
  );
};

export default NotFound;
