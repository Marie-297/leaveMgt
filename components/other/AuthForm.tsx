'use client';

import { Icons } from './icons';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { HiUserGroup } from "react-icons/hi";
import { HiUser } from "react-icons/hi2";

export function AuthForm() {
	const [providers, setProviders] = useState<
		Record<string, ClientSafeProvider>
	>({});
	const [selectedRole, setSelectedRole] = useState<string | null>(null);

	useEffect(() => {
		async function getProvidersValue() {
			const p = await getProviders();
			setProviders(p as Record<string, ClientSafeProvider>);
		}
		getProvidersValue();
	}, []);
	const handleSignIn = (providerId: string) => {
		if (!selectedRole) {
			alert('Please select a role before continuing');
			return;
		}
		signIn(providerId, {
			callbackUrl: `/dashboard?role=${selectedRole}`,
		}).catch((error) => {
			console.error('Sign-in error:', error);
			alert('Sign-in failed: You cannot be signed in with this role');
		});
	};

	return (
		<div className='grid gap-6'>
			<div className='flex gap-6 items-center justify-center'>
				<div className='flex flex-col items-center text-white font-extrabold'>
					<Button className={`h-20 w-20 ${selectedRole === 'admin' ? 'bg-blue-500' : ''}`}
						onClick={() => setSelectedRole('admin')}>
						<HiUserGroup size={50} />
					</Button>
					<p>ADMIN</p>
				</div>
				<div className='flex flex-col items-center text-white font-extrabold'>
					<Button className={`h-20 w-20 ${selectedRole === 'user' ? 'bg-blue-500' : ''}`}
						onClick={() => setSelectedRole('user')}>
						<HiUser size={50} />
					</Button>
					<p>USER</p>
				</div>
			</div>
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

			<div className='flex justify-center items-center'>
				{providers &&
					!!Object.keys(providers).length &&
					Object.values(providers!).map((provider) => (
						<Button
							key={provider.name}
							variant='outline'
							className='w-80 md:w-full'
							type='button'
							onClick={() => {
								handleSignIn(provider.id);
							}}
						>
							<FcGoogle className='h-5 w-5 mr-2' />
							<div className='font-semibold text-lg'> -Google</div>
						</Button>
					))}
			</div>
		</div>
	);
}
