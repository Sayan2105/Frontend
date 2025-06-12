import CustomTooltip from '@/components/customTooltip'
import EmptyList from '@/components/emptyList'
import IconMenu from '@/components/icon-menu'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useLabInvestigation from '@/pages/ipd/sections/lab-investigations/lab-investigation-handlers'
import PathReportInfo from '@/pages/pathology/report-info'
import PathSampleCollectionInfo from '@/pages/pathology/sample-collection-info'
import RadioReportInfo from '@/pages/radiology/report-info'
import RadioSampleCollectionInfo from '@/pages/radiology/sample-collection-info'
import { Eye, FlaskConical, Radiation } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { Fragment, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'



const OpdLabInvestigations = () => {

    const [search, setSearch] = useQueryState('search')
    const [ID, setID] = useState(0)
    const [isRadColOpen, setRadColOpen] = useState(false)
    const [isPathColOpen, setPathColOpen] = useState(false)
    const [isRadRepOpen, setRadRepOpen] = useState(false)
    const [isPathRepOpen, setPathRepOpen] = useState(false)

    const { radiologies, pathologies, getRadiologies, getPathologies } = useLabInvestigation(search!)

    const onSearch = useDebouncedCallback((value: string) => {
        value ? (setSearch(value)) : (setSearch(null))
    }, 400)

    useEffect(() => {
        getRadiologies()
        getPathologies()
    }, [search])



    return (
        <section className="flex flex-col gap-y-5">

            <div className="flex justify-between">
                <h1 className="text-lg text-gray-800 dark:text-white font-semibold">Lab Investigations</h1>
            </div>

            <Separator />

            <div className="sm:w-48 space-y-1">
                <p className="text-sm text-gray-700 dark:text-gray-300">Search by date</p>
                <Input type="search" placeholder='test name , date' onChange={(e) => { onSearch(e.target.value) }} />
            </div>

            <Separator />

            {/* pagination */}
            <section className="flex flex-col gap-y-5 min-h-[60vh]">
                <div className="flex-1">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Test Name</TableHead>
                                <TableHead>Lab</TableHead>
                                <TableHead>Sample Collected</TableHead>
                                <TableHead>Expected Date</TableHead>
                                <TableHead>Approved By</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {radiologies.map((radio, i) => (
                                <Fragment key={i}>
                                    {radio?.RadiologyBillItems?.map((item, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{item?.testName?.name}</TableCell>

                                            <TableCell>
                                                <IconMenu
                                                    iconBg="bg-violet-100 dark:bg-violet-500/10"
                                                    icon={<FlaskConical className="w-5 h-5 text-violet-500" />}
                                                    value="Radiology"
                                                />
                                            </TableCell>

                                            {/* Collector */}
                                            <TableCell className='flex flex-col'>
                                                {item.RadioSampleCollection?.id ?
                                                    <CustomTooltip message="View Collector">
                                                        <div className="relative p-2 w-fit bg-pink-100 dark:bg-pink-500/10 rounded-full">
                                                            <Eye className="w-4 h-4 text-pink-500" />
                                                            <span className="cursor-pointer absolute inset-0"
                                                                onClick={() => { setID(item.id), setRadColOpen(true) }}
                                                            />
                                                        </div>
                                                    </CustomTooltip>
                                                    :
                                                    <div className="rounded-md bg-red-100 dark:bg-red-500/10 p-1 w-fit">
                                                        <span className='text-sm text-red-500'>Not Collected</span>
                                                    </div>
                                                }
                                            </TableCell>

                                            <TableCell>{item.reportDate}</TableCell>

                                            {/* Approved By */}
                                            <TableCell className='flex flex-col'>
                                                {item.RadiologyReport?.id ? <CustomTooltip message="View Report">
                                                    <div className="relative p-2 w-fit bg-pink-100 dark:bg-pink-500/10 rounded-full">
                                                        <Eye className="w-4 h-4 text-pink-500" />
                                                        <span className="cursor-pointer absolute inset-0"
                                                            onClick={() => { setID(item.id), setRadRepOpen(true) }}
                                                        />
                                                    </div>
                                                </CustomTooltip>
                                                    :
                                                    <div className="rounded-md bg-red-100 dark:bg-red-500/10 p-1 w-fit">
                                                        <span className='text-sm text-red-500'>Not Approved</span>
                                                    </div>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </Fragment>
                            ))}


                            {/* Pathology */}
                            {pathologies.map((pato, i) => (
                                <Fragment key={i}>
                                    {pato?.PathologyBillItems?.map((item, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{item.testName?.name}</TableCell>

                                            <TableCell>
                                                <IconMenu
                                                    iconBg='bg-yellow-100 dark:bg-yellow-500/10'
                                                    icon={<Radiation className='w-5 h-5 text-yellow-500' />}
                                                    value='Pathology'
                                                />
                                            </TableCell>

                                            {/* Collector */}
                                            <TableCell className='flex flex-col'>
                                                {item.PathSampleCollection?.id ?
                                                    <CustomTooltip message="View Collector">
                                                        <div className="relative p-2 w-fit bg-pink-100 dark:bg-pink-500/10 rounded-full">
                                                            <Eye className="w-4 h-4 text-pink-500" />
                                                            <span className="cursor-pointer absolute inset-0"
                                                                onClick={() => { setID(item.id), setPathColOpen(true) }}
                                                            />
                                                        </div>
                                                    </CustomTooltip>
                                                    :
                                                    <div className="rounded-md bg-red-100 dark:bg-red-500/10 p-1 w-fit">
                                                        <span className='text-sm text-red-500'>Not Collected</span>
                                                    </div>
                                                }
                                            </TableCell>

                                            <TableCell>{item?.reportDate}</TableCell>

                                            {/* Approved By */}
                                            <TableCell className='flex flex-col'>
                                                {item.PathologyReport?.id ? <CustomTooltip message="View Report">
                                                    <div className="relative p-2 w-fit bg-pink-100 dark:bg-pink-500/10 rounded-full">
                                                        <Eye className="w-4 h-4 text-pink-500" />
                                                        <span className="cursor-pointer absolute inset-0"
                                                            onClick={() => { setID(item.id), setPathRepOpen(true) }}
                                                        />
                                                    </div>
                                                </CustomTooltip>
                                                    :
                                                    <div className="rounded-md bg-red-100 dark:bg-red-500/10 p-1 w-fit">
                                                        <span className='text-sm text-red-500'>Not Approved</span>
                                                    </div>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </ Fragment>
                            ))}
                        </TableBody>
                    </Table>

                    <EmptyList length={(radiologies.length + pathologies.length)} message="No Lab Investigations found" />
                </div>

                {/* pagination buttons */}
                {/* <section>
                    <CustomPagination
                        total_pages={medications?.total_pages!}
                        currentPage={page}
                        previous={(p) => setPage(p)}
                        goTo={(p) => setPage(p)}
                        next={(p) => setPage(p)}
                    />
                </section> */}


                {/* modals */}

                <RadioSampleCollectionInfo
                    ID={ID}
                    isOpen={isRadColOpen}
                    onClose={setRadColOpen}
                    excludeActions={true}
                />

                <RadioReportInfo
                    ID={ID}
                    isOpen={isRadRepOpen}
                    onClose={setRadRepOpen}
                    excludeActions={true}
                />

                <PathSampleCollectionInfo
                    ID={ID}
                    isOpen={isPathColOpen}
                    onClose={setPathColOpen}
                    excludeActions={true}
                />

                <PathReportInfo
                    ID={ID}
                    isOpen={isPathRepOpen}
                    onClose={setPathRepOpen}
                    excludeActions={true}
                />
            </section>
        </section>
    )
}



export default OpdLabInvestigations