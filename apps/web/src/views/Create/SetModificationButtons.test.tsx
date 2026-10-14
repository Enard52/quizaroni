// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vite-plus/test';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SetModificationButtons from './SetModificationButtons';

const theme = createTheme();

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (k: string) => k }),
}));

describe('SetModificationButtons', () => {
    it('sets proper ARIA attributes on the keyboard shortcuts button and menu', () => {
        render(
            <ThemeProvider theme={theme}>
                <SetModificationButtons
                    studysetCards={[]}
                    setCardsCallback={vi.fn()}
                    setShowImportModal={vi.fn()}
                />
            </ThemeProvider>
        );

        const button = screen.getByRole('button', { name: 'create.keyboardShortcuts' });
        expect(button).toBeDefined();
        expect(button.getAttribute('id')).toBe('keyboard-shortcuts-button');
        expect(button.getAttribute('aria-haspopup')).toBe('true');
        expect(button.getAttribute('aria-expanded')).toBeNull();

        // Click button to open menu
        fireEvent.click(button);

        expect(button.getAttribute('aria-expanded')).toBe('true');
        expect(button.getAttribute('aria-controls')).toBe('keyboard-shortcuts-menu');

        const menuList = screen.getByRole('menu');
        expect(menuList).toBeDefined();
        expect(menuList.getAttribute('aria-labelledby')).toBe('keyboard-shortcuts-button');
    });
});
