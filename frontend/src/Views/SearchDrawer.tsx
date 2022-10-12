import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Button,
  ButtonBase,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme
} from '@mui/material'
import { PERIODS } from 'Constant/PERIOD'
import { PREFECTURES } from 'Constant/PREFECTURE'
import { useState } from 'react'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

function getStyles(name: string, prefectures: readonly string[], theme: Theme) {
  return {
    fontWeight:
      prefectures.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
  }
}

export const SearchDrawer = () => {
  const theme = useTheme()
  const [periods, setPeriods] = useState<string[]>([])
  const [prefectures, setPrefecurets] = useState<string[]>([])

  const handlePeriod = (event: SelectChangeEvent<typeof prefectures>) => {
    const {
      target: { value }
    } = event
    setPeriods(typeof value === 'string' ? value.split(',') : value)
  }
  const handlePrefecture = (event: SelectChangeEvent<typeof prefectures>) => {
    const {
      target: { value }
    } = event
    setPrefecurets(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <>
      <input type="checkbox" id="search-drawer-checkbox" hidden />
      <div
        id="search-drawer-div"
        className="flex h-screen rounded-tr-3xl rounded-br-3xl bg-white shadow-lg overflow-hidden"
      >
        <div className="grow flex flex-col gap-y-10 pt-10 pr-2 pl-8">
          <div className="grid grid-rows-2 grid-cols-2 h-24 border border-[#B7B7B7] rounded-2xl overflow-hidden">
            <ButtonBase>
              <input type="radio" id="latest" name="drone" value="latest" className="peer" hidden defaultChecked />
              <label
                htmlFor="latest"
                className="flex items-center justify-center w-full h-full peer-checked:bg-[#1876D3] peer-checked:text-white peer-checked:border-0 border-[#B7B7B7] border-r border-b"
              >
                <p>最新</p>
              </label>
            </ButtonBase>
            <ButtonBase>
              <input type="radio" id="popular" name="drone" value="popular" className="peer" hidden />
              <label
                htmlFor="popular"
                className="flex items-center justify-center w-full h-full peer-checked:bg-[#1876D3] peer-checked:text-white peer-checked:border-0 border-[#B7B7B7] border-b"
              >
                <p>人気</p>
              </label>
            </ButtonBase>
            <ButtonBase>
              <input type="radio" id="old" name="drone" value="old" className="peer" hidden />
              <label
                htmlFor="old"
                className="flex items-center justify-center w-full h-full peer-checked:bg-[#1876D3] peer-checked:text-white peer-checked:border-0 border-[#B7B7B7] border-r"
              >
                <p>古い</p>
              </label>
            </ButtonBase>
            <ButtonBase>
              <input type="radio" id="new" name="drone" value="new" className="peer" hidden />
              <label
                htmlFor="new"
                className="flex items-center justify-center w-full h-full peer-checked:bg-[#1876D3] peer-checked:text-white peer-checked:border-0 border-[#B7B7B7]"
              >
                <p>新しい</p>
              </label>
            </ButtonBase>
          </div>

          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-search">キーワード検索</InputLabel>
            <OutlinedInput
              id="outlined-adornment-search"
              type="text"
              // value={values.search}
              // onChange={handleChange('search')}
              sx={{ borderRadius: '30px' }}
              endAdornment={
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              }
              label="キーワード検索"
            />
          </FormControl>

          <FormControl>
            <InputLabel id="demo-multiple-chip-label">時代</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              fullWidth
              value={periods}
              onChange={handlePeriod}
              input={<OutlinedInput id="select-multiple-chip" label="時代" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {PERIODS.map((period) => (
                <MenuItem key={period} value={period} style={getStyles(period, periods, theme)}>
                  {period}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="demo-multiple-chip-label">都道府県</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              fullWidth
              value={prefectures}
              onChange={handlePrefecture}
              input={<OutlinedInput id="select-multiple-chip" label="都道府県" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {PREFECTURES.map((prefecture) => (
                <MenuItem key={prefecture} value={prefecture} style={getStyles(prefecture, prefectures, theme)}>
                  {prefecture}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" sx={{ width: '100px', mx: 'auto', mt: 3 }}>
            検索
          </Button>
        </div>

        <label
          id="search-drawer-label"
          htmlFor="search-drawer-checkbox"
          className="block relative h-screen min-w-[48px] hover:bg-gray-100"
        >
          <span className="absolute top-1/2 right-3 w-1 h-8 bg-gray-300 rounded-lg"></span>
        </label>
      </div>
    </>
  )
}
