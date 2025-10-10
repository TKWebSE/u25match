// src/services/viewHistory/factory.ts
import { getServiceMode } from '@utils/serviceConfig';
import { MockViewHistoryService } from './mock';
import { ProdViewHistoryService } from './prod';
import { ViewHistoryService } from './types';

export function createViewHistoryService(): ViewHistoryService {
  const mode = getServiceMode('VIEW_HISTORY');

  if (mode === 'firebase') {
    return new ProdViewHistoryService();
  } else {
    return new MockViewHistoryService();
  }
}

