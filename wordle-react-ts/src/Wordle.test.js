import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Wordle from './Wordle';

describe('Wordle Component', () => {
  test('user can enter a letter in input box', async () => {
    render(<Wordle targetWord='apple' maxTries='2' />);

    // 模拟用户输入
    // act函数确保所有相关的DOM更新在断言之前完成
    // 当在测试中模拟事件或执行会影响组件状态（如Wordle组件中setGuesses更新状态）的操作时，须确保这些操作包裹在act()函数中
    await act(async () => {
      const input = screen.getAllByRole('textbox')[0];
      fireEvent.change(input, { target: {value: 'a'} });
    });

    // 断言：检查输入框的值是否更新为“a”
    const input = screen.getAllByRole('textbox')[0];
    expect(input.value).toBe('a');
  });
});
