import Layout from '@/components/layout/Layout'
import { FC, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ReduxToast } from './ReduxToast'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { HeaderProvider } from './HeadProvider/HeadProvider'

import { TypeComponentAuthFields } from '@/shared/types/auth.types'
import AuthProvider from './AuthProvider/AuthProvider'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

const MainProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	children,
	Component,
}) => {
	return (
		<HeaderProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ReduxToast />
					<AuthProvider Component={Component}>
						<Layout>{children}</Layout>
					</AuthProvider>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</Provider>
		</HeaderProvider>
	)
}

export default MainProvider
