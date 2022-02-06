import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Memory } from '../../types/object';
import { InputHook } from '../../hooks/InputHook';
import { RootState } from '../../redux/store';
import './style.scss';
import ItemRecommendation from './index';

export default React.memo(
  ({ inputHook, toggleRecommendation }: ItemRecommendationProps) => {
    const onCancel = useCallback(() => {
      toggleRecommendation(false);
    }, []);

    return (
      <div className="component-item-recommendation-wrapper">
        <div className="component-item-recommendation-box">
          <div className="component-item-recommendation-header">
            <button type="button" onClick={onCancel}>CANCEL</button>
          </div>

          <ItemRecommendationList
            inputHook={inputHook}
            toggleRecommendation={toggleRecommendation}
          />
        </div>
      </div>
    );
  },
);

const ItemRecommendationList = React.memo(
  ({ inputHook, toggleRecommendation }: ItemRecommendationProps) => {
    const { memories } = useSelector((state: RootState) => state.memory);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
      const valueContainingMemories = inputHook.value.trim().length > 0
        ? memories.filter((it) => it.id !== '0' && it.content.includes(inputHook.value)).slice(0, 3)
        : memories.filter((it) => it.id !== '0').slice(0, 3);

      if (valueContainingMemories.length === 0) {
        toggleRecommendation(false);
      } else {
        setRecommendations(valueContainingMemories);
      }
    }, [inputHook.value, memories]);

    return (
      <div>
        {recommendations.map((recommendation: Memory) => (
          <div key={recommendation.id} className="component-item-recommendation-memory">
            {recommendation.content}
          </div>
        ))}
      </div>
    );
  },
);

type ItemRecommendationProps = {
  inputHook: InputHook,
  toggleRecommendation: (to: boolean) => void,
}
