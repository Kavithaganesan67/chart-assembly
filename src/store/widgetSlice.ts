import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Widget } from '@/types/widget';

interface WidgetState {
  widgets: Widget[];
}

const initialState: WidgetState = {
  widgets: JSON.parse(localStorage.getItem('widgets') || '[]'),
};

const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget: (state, action: PayloadAction<Widget>) => {
      state.widgets.push(action.payload);
      localStorage.setItem('widgets', JSON.stringify(state.widgets));
    },
    updateWidget: (state, action: PayloadAction<Widget>) => {
      const index = state.widgets.findIndex(w => w.id === action.payload.id);
      if (index !== -1) {
        state.widgets[index] = action.payload;
        localStorage.setItem('widgets', JSON.stringify(state.widgets));
      }
    },
    deleteWidget: (state, action: PayloadAction<string>) => {
      state.widgets = state.widgets.filter(w => w.id !== action.payload);
      localStorage.setItem('widgets', JSON.stringify(state.widgets));
    },
  },
});

export const { addWidget, updateWidget, deleteWidget } = widgetSlice.actions;
export default widgetSlice.reducer;
