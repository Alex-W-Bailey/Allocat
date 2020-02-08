import Link from 'next/link';

const linkStyle = {
	marginRight: 15
};

const Header = () => (
	<div>
		<Link href="/">
			<a style={ linkStyle }>Login</a>
		</Link>
		<Link href="/register">
			<a style={ linkStyle }>Register</a>
		</Link>

	</div>
);

export default Header;