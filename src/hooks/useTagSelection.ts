// src/hooks/useTagSelection.ts
// タグ選択状態を管理するカスタムフック

import { myProfileMock } from '@mock/myProfileMock';
import { useCallback, useMemo, useState } from 'react';
import { useTagsData } from './useTagsData';

export interface SelectedTag {
  id: string;
  name: string;
  imageUrl: string;
}

const MAX_TAGS = 5; // 最大選択可能タグ数

export const useTagSelection = () => {
  const { allTags } = useTagsData();

  // 現在選択されているタグのIDリスト
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(() => {
    // 初期値は現在のユーザーのタグから取得（最大5個まで）
    const initialTags = myProfileMock.tags?.map(tag => tag.id) || [];
    console.log('初期化時のmyProfileMock.tags:', myProfileMock.tags);
    console.log('初期化時のselectedTagIds:', initialTags);
    return initialTags.slice(0, MAX_TAGS);
  });

  // 選択されたタグの詳細情報
  const selectedTags = useMemo(() => {
    console.log('selectedTags計算中...');
    console.log('allTags:', allTags.length);
    console.log('selectedTagIds:', selectedTagIds);
    const filtered = allTags.filter(tag => selectedTagIds.includes(tag.id));
    console.log('filtered selectedTags:', filtered);
    return filtered;
  }, [allTags, selectedTagIds]);

  // タグの選択状態を切り替え
  const toggleTagSelection = useCallback((tagId: string) => {
    console.log('タグ選択切り替え:', tagId);
    setSelectedTagIds(prev => {
      console.log('現在の選択状態:', prev);
      if (prev.includes(tagId)) {
        // 既に選択されている場合は選択解除
        const newSelection = prev.filter(id => id !== tagId);
        console.log('選択解除後の状態:', newSelection);
        return newSelection;
      } else {
        // 選択されていない場合は選択（最大5個まで）
        if (prev.length >= MAX_TAGS) {
          console.log('最大数に達しているため選択不可');
          return prev; // 既に最大数に達している場合は何もしない
        }
        const newSelection = [...prev, tagId];
        console.log('選択追加後の状態:', newSelection);
        return newSelection;
      }
    });
  }, []);

  // タグが選択されているかチェック
  const isTagSelected = useCallback((tagId: string) => {
    return selectedTagIds.includes(tagId);
  }, [selectedTagIds]);

  // 選択されたタグを保存（実際のAPI呼び出しを想定）
  const saveSelectedTags = useCallback(async () => {
    try {
      // TODO: 実際のAPI呼び出しを実装
      console.log('選択されたタグを保存:', selectedTags);

      // モックデータを更新（myProfileMockの形式に合わせる）
      myProfileMock.tags = selectedTags.map(tag => ({
        id: tag.id,
        name: tag.name,
        imageUrl: tag.imageUrl,
      }));

      return { success: true };
    } catch (error) {
      console.error('タグの保存に失敗:', error);
      return { success: false, error };
    }
  }, [selectedTags]);

  // 選択されたタグの数を取得
  const selectedCount = selectedTagIds.length;

  // 最大選択可能数に達しているかチェック
  const isMaxReached = selectedCount >= MAX_TAGS;

  return {
    selectedTagIds,
    selectedTags,
    toggleTagSelection,
    isTagSelected,
    saveSelectedTags,
    selectedCount,
    maxTags: MAX_TAGS,
    isMaxReached,
  };
};
