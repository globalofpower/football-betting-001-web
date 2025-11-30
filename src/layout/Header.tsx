import { CustomDialogBox } from '@/components/common/CustomDialogBox';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { langChange } from '@/lang';
import { useCombineStore } from '@/store';
import { Search, X, RefreshCcw, ListFilter } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router';
import classes from '@/assets/styles/Header.module.css';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { clickSongEffect } from '@/utils/Helper';

const Header = () => {
  const [openFilterModal,setOpenFilterModal] = useState(false);
  const {filterLeaguesValue,setFilterLeaguesValueHandler} = useCombineStore();
  const {sortByTypeValue,setSortByTypeValueHandler} = useCombineStore();
  const {searchMatchValue,setSearchMatchValueHandler} = useCombineStore();
  const {allLeaguesValue} = useCombineStore();
  const {refetchValue} = useCombineStore();
  const {totalMatchValue} = useCombineStore();
  const [rotateEff,setRotateEff] = useState<boolean>(false);
  const {pathname} = useLocation();

  const footballTitleHandle = ():any => {
    if(pathname === "/body"){
      return langChange.body
    };
    if(pathname === "/parlay"){
      return langChange.parlay
    };
    if(pathname === "/1st-half"){
      return langChange.first_half
    };
  };

  const refetchHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setRotateEff(true);
    refetchValue?.();
    clickSongEffect();
    setTimeout(()=>{
      setRotateEff(false);
    },2000);
  };

  return (
    <>
        <header
            className="sticky top-0 z-[99999] flex items-center bg-[var(--secodary-color)] shadow-[0 1px 2px 0 #3c40434d,0 1px 3px 1px #3c404326] w-full max-w-[500px] h-[55px] py-[0] px-[10px]"
        >
            <div className="w-full flex items-center justify-between">
                <h1 className='text-white'>555 Mix</h1>
                <span className='text-[14px] text-[var(--white-color)] font-medium'>{footballTitleHandle()}</span>
                <div className='flex items-center gap-1'>
                    <button
                        className={`inline-flex items-center rotate-45 justify-center rounded-full bg-transparent transition mr-2.5 cursor-pointer ${rotateEff ? classes.rotateEff: ''}`}
                        onClick={refetchHandler}
                        disabled={rotateEff}
                    >
                        <RefreshCcw size={20} strokeWidth={2.5} color='var(--white-color)' />
                    </button>
                    <button
                        className=" inline-flex items-center justify-center rounded-full bg-transparent transition cursor-pointer"
                        onClick={() => setOpenFilterModal(true)}
                        disabled={totalMatchValue === 0}
                    >
                        <ListFilter size={20} strokeWidth={2.5} color='var(--white-color)' />
                    </button>
                </div>
            </div>
        </header>
        <CustomDialogBox label="Matches Setting" open={openFilterModal} setOpen={setOpenFilterModal}>
            <div className="flex flex-col gap-4">
              <div className='border-b border-b-[#c7c7c7] pb-4 pt-3'>
                <RadioGroup className='flex mb-4' defaultValue={sortByTypeValue} onValueChange={(value) => setSortByTypeValueHandler(value)}>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem className="cursor-pointer custom-radio-bullet data-[state=checked]:border-[var(--secodary-color)] data-[state=checked]:bg-[var(--secodary-color)]" value="time" id="time" />
                    <Label className='cursor-pointer font-bold' htmlFor="time">Sort By Time</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem className='cursor-pointer custom-radio-bullet data-[state=checked]:border-[var(--secodary-color)] data-[state=checked]:bg-[var(--secodary-color)]' value="league" id="league" />
                    <Label htmlFor="league" className='cursor-pointer font-bold'>Sort By League</Label>
                  </div>
                </RadioGroup>
                <InputGroup>
                  <InputGroupAddon>
                    <Search />
                  </InputGroupAddon>
                  <InputGroupInput value={searchMatchValue} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearchMatchValueHandler(e.target.value)} placeholder="Search..." />
                   {
                    searchMatchValue &&
                    <InputGroupButton className='cursor-pointer' onClick={() => setSearchMatchValueHandler("")}>
                      <X />
                    </InputGroupButton>
                   }
                </InputGroup>
              </div>
              <div className="flex items-center justify-between">
                <span className='text-[var(--soft-main-color)] font-bold'>Leagues {allLeaguesValue?.length}</span>
                <div className="flex items-center gap-3">
                  <Label htmlFor={`all`} className='cursor-pointer'>{filterLeaguesValue.length === allLeaguesValue.length ? 'Unchecked All': "Check All"}</Label>
                  <Checkbox id={`all`} className='cursor-pointer data-[state=checked]:bg-[var(--soft-main-color)] data-[state=checked]:border-[var(--soft-main-color)]'
                    checked={filterLeaguesValue.length === allLeaguesValue.length}
                    onCheckedChange={()=>{
                      if (filterLeaguesValue.length > 0) {
                        if(filterLeaguesValue.length === allLeaguesValue.length){
                          setFilterLeaguesValueHandler([]);
                        }else{
                          setFilterLeaguesValueHandler(allLeaguesValue);
                        };
                      } else {
                        setFilterLeaguesValueHandler(allLeaguesValue);
                      }
                    }}
                  />
                </div>
              </div>
              {
                allLeaguesValue?.length > 0 &&
                allLeaguesValue?.map((league:string,i:number) => 
                  <div className="flex items-center gap-3" key={i}>
                    <Checkbox id={`${league}_i`} className='cursor-pointer data-[state=checked]:bg-[var(--soft-main-color)] data-[state=checked]:border-[var(--soft-main-color)]'
                      checked={filterLeaguesValue?.includes(league)}
                      onCheckedChange={() => {
                        if (filterLeaguesValue.length > 0) {
                          let temp = [];
                          if (filterLeaguesValue?.includes(league)) {
                            temp = filterLeaguesValue?.filter((l:any) => l !== league);
                          } else {
                            temp = [...filterLeaguesValue, league];
                          }
                          setFilterLeaguesValueHandler(temp);
                        } else {
                          setFilterLeaguesValueHandler([league]);
                        }
                        window.scrollTo(0, 0);
                      }}
                    />
                    <Label htmlFor={`${league}_i`} className='cursor-pointer'>{league}</Label>
                  </div>
                )
              }
              
            </div>
        </CustomDialogBox>
    </>
  )
}

export default Header