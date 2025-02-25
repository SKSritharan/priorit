import { vi } from 'vitest'
import { config } from '@vue/test-utils'

config.global.mocks = {
    $toast: {
        success: vi.fn(),
        error: vi.fn(),
        info: vi.fn()
    }
}
