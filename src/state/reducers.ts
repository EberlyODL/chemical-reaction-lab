import { createActions } from 'redux-actions'
import { InventoryItem } from '../inventory/variables';

const defaultState = {
  inventory: [
    {
      id: 'bottle1'
    },
    {
      id: 'bottle2'
    },
    {
      id: 'bottle3'
    }
  ],
  selectedItems: [],
}

const { selectInventoryItem, unselectInventoryItem } = createActions({
  selectedItems: (item: InventoryItem) => {
  }
}) 