'use client';

import { Icons } from './icons';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

export function AuthForm() {
	const [providers, setProviders] = useState<
		Record<string, ClientSafeProvider>
	>({});

	useEffect(() => {
		async function getProvidersValue() {
			const p = await getProviders();
			setProviders(p as Record<string, ClientSafeProvider>);
		}
		getProvidersValue();
	}, []);

	return (
		<div className='grid gap-6'>
			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-background px-2 text-muted-foreground'>
						Continue with
					</span>
				</div>
			</div>

			{providers &&
				!!Object.keys(providers).length &&
				Object.values(providers!).map((provider) => (
					<Button
						key={provider.name}
						variant='outline'
						type='button'
						onClick={() => {
							signIn(provider.id, {
								callbackUrl: '/dashboard',
							}).catch((error) => console.error('Sign-in error:', error));
						}}
					>
						<FcGoogle className='h-5 w-5 mr-2' />
						<div className='font-semibold text-lg'> -Google</div>
					</Button>
				))}
		</div>
	);
}
