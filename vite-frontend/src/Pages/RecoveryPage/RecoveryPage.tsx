import React from 'react';
import Tag from '../../Components/Tag/Tag';

interface RecoveryPageProps {} 

const RecoveryPage: React.FC<RecoveryPageProps> = () => {
    return (
        <div>
            <Tag className="text-sm" head="Forgot password" tail="You will recieve recovery code for reseting your password." flip={true}/>
            <form>
                <div id="email-field">
                    <label id="email" htmlFor="email"></label>
                    <input
                        id="email" type="text" placeholder="Email"
                    />
                </div>
                <button>

                </button>
            </form>
        </div>
    );
};

export default RecoveryPage;