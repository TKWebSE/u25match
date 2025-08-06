// src/config/apiConfig.ts
import { profileDetailService } from '@services/profile';

// モックモードの切り替え
export const setMockMode = (enabled: boolean) => {
  profileDetailService.setMockMode(enabled);
  console.log(`Mock mode ${enabled ? 'enabled' : 'disabled'}`);
};

// モックモードかどうかを確認
export const isMockMode = (): boolean => {
  return profileDetailService.isMockMode();
}; 
