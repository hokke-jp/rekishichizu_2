import * as React from 'react'
import { Global } from '@emotion/react'
import { styled } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { grey } from '@mui/material/colors'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'

const drawerBleeding = 56

interface Props {
  window?: () => Window
}

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light'
      ? grey[100]
      : theme.palette.background.default
}))

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
  border: 'solid',
  borderWidth: '1px',
  borderColor: 'black'
}))

const Puller = styled(Box)(({ theme }) => ({
  width: 6,
  height: 30,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: '50%',
  right: 8
}))

export function MuiDrawer(props: Props) {
  const { window } = props
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            // height: `calc(50% - ${drawerBleeding}px)`,
            width: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible'
          }
        }}
      />
      <Box sx={{ textAlign: 'center', pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
      </Box>
      <SwipeableDrawer
        container={container}
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        onClick={toggleDrawer(!open)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true
        }}
        BackdropProps={{ invisible: true }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            visibility: 'visible',
            top: 0,
            bottom: 0,
            height: '100vh',
            width: '100%'
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: 'text.secondary' }}>
            51 results
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            py: 2,
            pl: 2,
            height: '100%',
            width: '100%',
            overflow: 'auto'
          }}
        ></StyledBox>
      </SwipeableDrawer>
    </Root>
  )
}
