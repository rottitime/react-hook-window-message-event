import IndexPage, { Results } from '@/pages/index'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders, screen, waitFor } from '@/lib/test-utils'

const MockData: Results = {
  results: [{ name: 'test person 1' }, { name: 'test person 2' }]
}

describe('Page: Index', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })
  it('renders', async () => {
    renderWithProviders(<IndexPage />)

    expect(screen.getByText('Get started by editing')).toBeInTheDocument()
  })

  it('shows fetch data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(MockData), { status: 200 })
    renderWithProviders(<IndexPage />)

    await waitFor(async () =>
      expect(screen.getByTestId('fetched-data')).toBeInTheDocument()
    )
    expect(await screen.findByText(MockData.results[0].name)).toBeInTheDocument()
  })
})
