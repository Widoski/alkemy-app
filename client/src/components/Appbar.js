import { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

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
		background: "#0a043c"
	},
	link: {
		textDecoration: "none",
		color: "black"
	}
}));

function Appbar({ title, children }) {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = useState(null);

	const handleOpenMenu = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<AppBar className={classes.appbarColor} position="static">
				<Toolbar>
					<IconButton
						onClick={handleOpenMenu}
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						aria-controls="simple-menu"
						aria-haspopup="true"
						onClick={handleOpenMenu}
					>
						<MenuIcon />
					</IconButton>
					<Menu
						id="simple-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleCloseMenu}
					>
						<Link className={classes.link} to="/"><MenuItem>Home</MenuItem></Link>
						<Link className={classes.link} to="/registers"><MenuItem>My registers</MenuItem></Link>
						<Link className={classes.link} to="/categories"><MenuItem>Categories</MenuItem></Link>
					</Menu>
					<Typography variant="button" className={classes.title}>
						{title}
					</Typography>
				</Toolbar>
			</AppBar>
			{children}
		</>
	);
}

export default Appbar;
