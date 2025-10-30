// src/services/search/factory.ts
// 🏭 検索サービス工場 - 環境判定と生成
import { getServiceMode } from '@utils/serviceConfig';
import { MockSearchService } from './mock';
import { ProdSearchService } from './prod';
import { SearchService } from './types';

export class SearchServiceFactory {
  /**
   * 環境に応じて検索サービスを生成
   * - mock/firebase の切替は環境変数で判定
   *
   * @returns SearchService のインスタンス
   */
  static createSearchService(): SearchService {
    const mode = getServiceMode('SEARCH');
    return mode === 'firebase' ? new ProdSearchService() : new MockSearchService();
  }
}

/**
 * 検索サービス生成のショートカット関数
 * - 呼び出し側は実装の詳細を意識せずに利用可能
 */
export const createSearchService = (): SearchService =>
  SearchServiceFactory.createSearchService();


