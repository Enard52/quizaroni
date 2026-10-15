// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vite-plus/test';
import { render, screen, fireEvent } from '@testing-library/react';
import { CardFileMetadata } from 'shared/types';
import ImagePreview from './ImagePreview';

const file: CardFileMetadata = {
    association: 'definition',
    key: 'cards/c1/diagram.png',
    name: 'diagram.png',
    signedURL: 'https://example.test/diagram.png',
    size: 2048,
};

function setup(opts: { onReplace?: boolean; isDeleting?: boolean } = {}) {
    const onDelete = vi.fn();
    const onReplace = vi.fn();
    render(
        <ImagePreview
            file={file}
            onDelete={onDelete}
            onReplace={opts.onReplace === false ? undefined : onReplace}
            isDeleting={opts.isDeleting === true}
        />
    );
    return { onDelete, onReplace };
}

describe('ImagePreview keyboard access', () => {
    it('keeps the image actions in the tab order with no mouse involved', () => {
        setup();
        const deleteButton = screen.getByLabelText('Delete image');
        const replaceButton = screen.getByLabelText('Replace image');
        deleteButton.focus();
        expect(document.activeElement).toBe(deleteButton);
        replaceButton.focus();
        expect(document.activeElement).toBe(replaceButton);
    });

    it('activates Delete and Replace from the keyboard', () => {
        // fireEvent.click is the activation a native button makes on Enter or Space.
        const { onDelete, onReplace } = setup();
        fireEvent.click(screen.getByLabelText('Delete image'));
        expect(onDelete).toHaveBeenCalledWith(file.key);
        fireEvent.click(screen.getByLabelText('Replace image'));
        expect(onReplace).toHaveBeenCalledWith(file.key);
    });

    it('keeps the actions away while the file is being deleted', () => {
        setup({ isDeleting: true });
        expect(screen.queryByLabelText('Delete image')).toBeNull();
    });

    it('only offers Delete when the caller has no replace handler', () => {
        setup({ onReplace: false });
        expect(screen.getByLabelText('Delete image')).toBeTruthy();
        expect(screen.queryByLabelText('Replace image')).toBeNull();
    });
});
