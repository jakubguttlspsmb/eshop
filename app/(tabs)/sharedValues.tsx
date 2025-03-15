import { useState } from 'react';

let methCount = [0, 0, 0, 0];

export const updateMethCount = (newCount) => {
  methCount = newCount;
};

export const getMethCount = () => {
  return methCount;
};