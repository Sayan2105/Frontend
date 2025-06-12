import { Pagination, PaginationContent, PaginationItem } from './ui/pagination'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

type CustomPaginationProps = {
    currentPage: number,
    total_pages: number,
    next: (np: number) => void
    goTo: (gtP: number) => void
    previous: (pp: number) => void
}

const CustomPagination = ({ currentPage, total_pages, next, goTo, previous }: CustomPaginationProps) => {

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                    <Button size='sm'
                        className={cn({ 'hidden': currentPage === 1 })}
                        onClick={() => previous(currentPage - 1)}>Previous</Button>
                </PaginationItem>

                {/* Always show the first page */}
                <PaginationItem>
                    <Button size='sm' variant={currentPage === 1 ? 'outline' : 'ghost'}
                        onClick={() => goTo(1)}>1</Button>
                </PaginationItem>


                {/* Show an ellipsis if the current page is far from the start */}
                {currentPage > 3 && (
                    <PaginationItem>
                        <span className="px-4">...</span>
                    </PaginationItem>
                )}


                {/* if page is 2 total page is 4 then 2 , 3*/}
                {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
                    .filter((pageNumber) => pageNumber > 1 && pageNumber < total_pages)
                    .map((pageNumber) => (
                        <PaginationItem key={pageNumber}>
                            <Button size='sm' variant={currentPage === pageNumber ? 'outline' : 'ghost'}
                                onClick={() => goTo(pageNumber)}>{pageNumber}</Button>
                        </PaginationItem>
                    ))}


                {/* Show an ellipsis if the current page is far from the end */}
                {currentPage < total_pages - 2 && (
                    <PaginationItem>
                        <span className="px-4">...</span>
                    </PaginationItem>
                )}

                {/* Always show the last page */}
                {total_pages > 1 && (
                    <PaginationItem>
                        <Button size='sm' variant={currentPage === total_pages ? 'outline' : 'ghost'}
                            onClick={() => goTo(total_pages)}>{total_pages}</Button>
                    </PaginationItem>
                )}

                {/* Next Button */}
                <PaginationItem>
                    <Button size='sm'
                        className={cn({ 'hidden': currentPage === total_pages || total_pages === 0 })}
                        onClick={() => next(currentPage + 1)}>Next</Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination >
    )
}

export default CustomPagination