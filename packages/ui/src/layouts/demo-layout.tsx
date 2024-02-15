import {Suspense} from 'react'
import {JSONTree} from 'react-json-tree'
import {Outlet} from 'react-router-dom'

import {Loading} from '@/components/ui/loading'
import {trpcReact} from '@/trpc/trpc'
import {t} from '@/utils/i18n'

export function Demo() {
	return (
		<>
			<Suspense>
				<Outlet />
			</Suspense>
			<Trpc />
			<I18n />
		</>
	)
}

function Trpc() {
	const res = trpcReact.debug.greet.useQuery('world')

	const ctx = trpcReact.useContext()
	ctx.user.get.fetch()

	const getQuery = trpcReact.user.get.useQuery()

	if (res.isLoading) {
		return <Loading />
	}

	if (res.error) {
		return <div>Error loading</div>
	}

	return (
		<div>
			{res.data}
			<JSONTree data={getQuery.data} />
		</div>
	)
}

function I18n() {
	return <div>{t('hello')}</div>
}
