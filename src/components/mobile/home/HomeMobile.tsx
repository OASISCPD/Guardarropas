import { FaSearch, FaQrcode } from 'react-icons/fa'
import { MdOutlineReorder } from 'react-icons/md'
import { CardSearch } from './CardSearch'
import { ScrollContainer } from '../../logic/ScrollContainer'
import { CardClientSelect } from './CardClientSelect'

export function HomeMobile() {
    return (
        <div className="min-h-screen  text-white">
            {/* NAVBAR */}
            <nav className="bg-colorGray px-4 py-3">
                <MdOutlineReorder className='ml-auto' size={40} />
            </nav>

            {/* CARD SEARCH */}
            <CardSearch />

            <CardClientSelect />
            <ScrollContainer maxHeight='700px'>
                {/* CARD BOXES */}
                <div className="p-4">
                    <div className="mb-2 bg-colorGray rounded-md p-4">
                        <h2 className="text-lg font-semibold mb-3">📦 BOXES</h2>
                        <div className="grid grid-cols-10 gap-2">
                            {[...Array(90)].map((_, i) => (
                                <button
                                    key={i}
                                    className="aspect-square bg-colorGreen rounded flex items-center justify-center text-sm font-medium hover:bg-green-600 transition-colors"
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className='bg-colorGray rounded-md p-4'>
                        <h2 className="text-lg font-semibold mb-3">👔 PERCHAS</h2>
                        <div className="grid grid-cols-10 gap-2">
                            {[...Array(50)].map((_, i) => (
                                <button
                                    key={i}
                                    className="aspect-square bg-colorGreen rounded flex items-center justify-center text-sm font-medium hover:bg-green-600 transition-colors"
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollContainer>
        </div>
    )
}

