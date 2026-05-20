'use client';

import { createContext, useContext } from 'react';

const ImageGridContext = createContext(false);

export const useInImageGrid = () => useContext(ImageGridContext);

export const ImageGridProvider = ImageGridContext.Provider;
