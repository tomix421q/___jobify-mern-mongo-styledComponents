import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useAllJobsContext } from '../../pages/AllJobs'

function PageBtnContainer() {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext()

  const { search, pathname } = useLocation()
  const navigate = useNavigate()
  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1)

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button className={`btn page-btn ${activeClass && 'active'}`} key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
        {pageNumber}
      </button>
    )
  }

  const renderPageButtons = () => {
    const pageButtons = []

    // first page - 1 button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: currentPage === 1 }))
    // dots
    if (currentPage > 3) {
      pageButtons.push(
        <span className='page-btn dots' key={'dots-1'}>
          ...
        </span>
      )
    }
    //next logic middle - 2 button (before current page)
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(addPageButton({ pageNumber: currentPage - 1, activeClass: false }))
    }
    // current page - 3 button
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(addPageButton({ pageNumber: currentPage, activeClass: true }))
    }
    //next logic middle - 4 button (after current page)
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(addPageButton({ pageNumber: currentPage + 1, activeClass: false }))
    }
    // dots
    if (currentPage < numOfPages - 1) {
      pageButtons.push(
        <span className='page-btn dots' key={'dots+1'}>
          ...
        </span>
      )
    }
    //  last page - 4 button
    pageButtons.push(addPageButton({ pageNumber: numOfPages, activeClass: currentPage === numOfPages }))
    return pageButtons
  }

  return (
    <Wrapper>
      {/*  */}
      {/* prev page  */}
      <button
        className='btn prev-btn'
        onClick={() => {
          let prevPage = currentPage - 1
          if (prevPage < 1) prevPage = numOfPages
          handlePageChange(prevPage)
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>

      {/* pages  */}
      <div className='btn-container'>{renderPageButtons()}</div>

      {/*  */}
      {/* next page */}
      <button
        className='btn next-btn'
        onClick={() => {
          let nextPage = currentPage + 1
          if (nextPage > numOfPages) nextPage = 1
          handlePageChange(nextPage)
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}
export default PageBtnContainer
