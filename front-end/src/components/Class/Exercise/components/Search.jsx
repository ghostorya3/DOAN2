import * as React from 'react';
import { MenuItem, Select } from '@mui/material';
import { Cached } from '@mui/icons-material';

export default function ComboBox({ setSearch, search }) {
    return (
        <>
            <div className='mt-5 '>
                <div className='flex gap-5'>
                    <div>
                        <label className="font-medium">Tên bài tập</label>
                        <input 
                            value={search?.name || ''} 
                            type="text" 
                            className='p-5 border border-[#e0e0e0] outline-none rounded-md h-[57px] w-[300px] box-border mt-2' 
                            placeholder='Nhập vào tên' 
                            onChange={(e) => setSearch((prev) => ({ ...prev, name: e.target.value }))} 
                        />
                    </div>

                    <div>
                        <div className="font-medium">Ngày bắt đầu</div>
                        <input 
                            value={search?.startDate || ''} 
                            type="date" 
                            className='p-5 border border-[#e0e0e0] outline-none rounded-md h-[57px] w-[300px] box-border mt-2' 
                            onChange={(e) => setSearch((prev) => ({ ...prev, startDate: e.target.value }))} 
                        />
                    </div>

                    <div>
                        <div className="font-medium">Ngày kết thúc</div>
                        <input 
                            type="date" 
                            value={search?.endDate || ''} 
                            className='p-5 border-[#e0e0e0] border outline-none rounded-md h-[57px] w-[300px] box-border mt-2' 
                            onChange={(e) => setSearch((prev) => ({ ...prev, endDate: e.target.value }))} 
                        />
                    </div>

                    <div>
                        <div className="font-medium">Trạng thái</div>
                        <select 
                            className='p-5 border-[#e0e0e0] border outline-none rounded-md h-[60px] w-[300px] box-border mt-2' 
                            onChange={(e) => setSearch((prev) => ({ ...prev, status: e.target.value }))} 
                            value={search?.status || ''}
                        >
                            <option value="Còn hạn">Còn hạn</option>
                            <option value="Hết hạn">Hết hạn</option>
                        </select>
                    </div>

                    <div >
                        <div className="font-medium">Refresh</div>
                        <div 
                            className='mt-2 h-[57px] w-[57px] border flex justify-center items-center cursor-pointer' 
                            onClick={() => setSearch({
                                name: '',
                                startDate: '',
                                endDate: '',
                                status: ''
                            })}
                        >
                            <Cached />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
