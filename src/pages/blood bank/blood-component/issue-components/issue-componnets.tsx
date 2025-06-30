import AlertModel from '@/components/alertModel'
import CustomPagination from '@/components/customPagination'
import EmptyList from '@/components/emptyList'
import LoaderModel from '@/components/loader'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import ProtectedTable from '@/components/protected-table'
import TableActions from '@/components/table-actions'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import UserImage from '@/components/user-image'
import { page_limit } from '@/globalData'
import { currencySymbol } from '@/helpers/currencySymbol'
import { currencyFormat } from '@/lib/utils'
import { Component, Plus } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import IssueBloodComponent from './form'
import useBloodComponentIssue from './handlers'
import IssueBloodComponentModal from './info-modal'
import GenerateBloodComponentInvoice from './pdf-template/invoice'




const BloodComponentIssues = () => {

  // params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')
  const [print, setPrint] = useState(false)

  const { issuedComponents, getIssuedComponents, current, setCurrent, getIssuedComponentById, handleSubmit, onDelete, isPending, confirmationProps, form, setForm } = useBloodComponentIssue({ page, limit: page_limit, search })


  const onSearch = useDebouncedCallback(async (value: string) => {
    value ? (setSearch(value)) : (setSearch(null))
    setPage(1) // always should execute
  }, 400)


  useEffect(() => {
    getIssuedComponents()
  }, [page, search])



  return (

    <>
      <div className='my-2 flex flex-col'>

        {/* top bar */}
        <div className='flex py-3 flex-col md:flex-row gap-y-2 md:items-center md:justify-between border-b border-gray-200 dark:border-gray-800'>
          <h1 className='font-semitemold tracking-tight'>Component Issues</h1>
          <div className='flex gap-x-2 overflow-x-auto'>

            <PermissionProtectedAction action='create' module='Issue Blood Component'>
              <Button type='button' size={'sm'}
                onClick={() => { setForm(true) }} >
                <Plus /> Issue Component
              </Button>
            </PermissionProtectedAction>

            <PermissionProtectedAction action='view' module='Blood Component'>
              <Link to={'../blood-components'} className={buttonVariants({
                variant: 'default', size: 'sm', className: 'flex gap-x-1'
              })}><Component /> Components </Link>
            </PermissionProtectedAction>

          </div>
        </div>


        {/* search bar */}

        <div className='flex py-3 flex-col md:flex-row gap-y-4 md:items-center md:justify-between border-b border-gray-200 dark:border-gray-800'>
          <div className='flex gap-x-2'>
            <Input type='text' height='10px' placeholder='search' defaultValue={search!} onChange={(e) => { onSearch(e.target.value) }} />
          </div>
        </div>


        <div className="flex flex-col gap-y-5 min-h-[75vh] mb-16 mt-5">
          <div className="flex-1">
            <ProtectedTable module='Issue Blood Component' renderTable={(show, canUpdate, canDelete) => (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice No</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Issued Date</TableHead>
                    <TableHead>Blood Group</TableHead>
                    <TableHead>component</TableHead>
                    <TableHead>Bag</TableHead>
                    <TableHead>Standard Charge {currencySymbol()}</TableHead>
                    <TableHead>Tax%</TableHead>
                    <TableHead>Discount%</TableHead>
                    <TableHead>Net Amount {currencySymbol()}</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>


                <TableBody>
                  {issuedComponents.data.map((item) => {
                    return <TableRow key={item.id}>
                      <TableCell className="font-semitemold cursor-pointer text-blue-500 hover:text-blue-400 hover:underline"
                        onClick={async () => {
                          await getIssuedComponentById(item.id)
                        }}>
                        {item.id}
                      </TableCell>
                      <TableCell>
                        <UserImage url={item.patient.image} name={item.patient.name} gender={item.patient.gender} />
                      </TableCell>
                      <TableCell className='whitespace-nowrap'>{item.patient.gender}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.blood_group}</TableCell>
                      <TableCell>{item.component}</TableCell>
                      <TableCell>{item.bag}</TableCell>
                      <TableCell>{currencyFormat(item.standard_charge)}</TableCell>
                      <TableCell>{item.tax}%</TableCell>
                      <TableCell>{item.discount}%</TableCell>
                      <TableCell>{currencyFormat(item.net_amount)}</TableCell>
                      <TableActions
                        show={show}
                        canUpdate={canUpdate}
                        canDelete={canDelete}
                        onDelete={() => onDelete(item.id)}
                        exclude={{ edit: true }}
                        incluePrint={{
                          include: true,
                          print: async () => {
                            await getIssuedComponentById(item.id)
                            setPrint(true)
                          }
                        }}
                      />
                    </TableRow>
                  })}
                </TableBody>
              </Table>
            )} />

            {/* if no data will be recive */}
            <EmptyList length={issuedComponents.data.length} message='No data found' />
          </div>

          {/* Pagination */}

          <CustomPagination
            total_pages={issuedComponents?.total_pages}
            currentPage={+page}
            previous={setPage}
            goTo={setPage}
            next={setPage}
          />
        </div>
      </div>


      {/* Alert Model */}
      {confirmationProps.isOpen && <AlertModel
        cancel={() => confirmationProps.onCancel()}
        continue={() => confirmationProps.onConfirm()}
      />}


      {/* Loader model */}
      {isPending && (<LoaderModel />)}

      {form && (
        <IssueBloodComponent
          isPending={isPending}
          Submit={handleSubmit}
          onClick={() => setForm(false)}
        />
      )}

      {(current && !print) && (
        <IssueBloodComponentModal
          info={current!}
          onClick={() => setCurrent(undefined)}
        />
      )}


      {print && (
        <GenerateBloodComponentInvoice
          info={current!}
          afterGenerate={() => { setPrint(false); setCurrent(undefined) }}
        />
      )}

    </>

  )
}







export default BloodComponentIssues