import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AuthForm } from './AuthForm';

const font = Poppins({
	subsets: ['latin'],
	weight: ['600'],
});

const Authentication = () => {
	return (
		<div className='min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 sky'>
			<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
				<div className='flex flex-col space-y-2 text-center'>
					<h1
						className={cn(
							'text-6xl font-semibold drop-shadow-md text-white tracking-tight',
							font.className
						)}
					>
						🔐 Auth
					</h1>
					<p className='text-sm text-white  text-muted-foreground'>
						Login with your work email to access your portal
					</p>
				</div>
				<AuthForm />
				<p className='px-8 text-center text-sm text-white text-muted-foreground'>
					By clicking continue, you agree to the company{' '}
					<Link
						href='/terms'
						className='underline underline-offset-4 text-white hover:text-primary'
					>
						Terms of Service
					</Link>{' '}
					and{' '}
					<Link
						href='/privacy'
						className='underline underline-offset-4 text-white hover:text-primary'
					>
						Privacy Policy
					</Link>
					.
				</p>
			</div>
		</div>
	);
};

export default Authentication;
