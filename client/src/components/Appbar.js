import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { Children } from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	appbarColor: {
		background: "#493323"
	}
}));

function Appbar({ title, children }) {
	const classes = useStyles();

	return (
		<>
			<AppBar className={classes.appbarColor} position="static">
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="button" className={classes.title}>
						{title}
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			{children}
		</>
	);
}

export default Appbar;
